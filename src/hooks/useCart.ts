
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { CartItem, Product } from '@/types/database';

export function useCart() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [localCart, setLocalCart] = useState<any[]>([]);

  // Load local cart from localStorage
  useEffect(() => {
    try {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      setLocalCart(cart);
    } catch {
      setLocalCart([]);
    }
  }, []);

  // Database cart for authenticated users
  const { data: dbCart = [], isLoading } = useQuery({
    queryKey: ['cart', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('cart_items')
        .select(`
          *,
          product:products(*)
        `)
        .eq('user_id', user.id);
      
      if (error) throw error;
      return data as CartItem[];
    },
    enabled: !!user,
  });

  const addToCartMutation = useMutation({
    mutationFn: async ({ productId, quantity = 1 }: { productId: string; quantity?: number }) => {
      if (user) {
        // Add to database cart
        const { data, error } = await supabase
          .from('cart_items')
          .upsert({
            user_id: user.id,
            product_id: productId,
            quantity,
          })
          .select();
        
        if (error) throw error;
        return data;
      } else {
        // Add to local cart
        const cart = [...localCart];
        const existingItem = cart.find(item => item.productId === productId);
        
        if (existingItem) {
          existingItem.quantity += quantity;
        } else {
          cart.push({ productId, quantity });
        }
        
        setLocalCart(cart);
        localStorage.setItem('cart', JSON.stringify(cart));
        return cart;
      }
    },
    onSuccess: () => {
      if (user) {
        queryClient.invalidateQueries({ queryKey: ['cart', user.id] });
      }
    },
  });

  const removeFromCartMutation = useMutation({
    mutationFn: async (productId: string) => {
      if (user) {
        const { error } = await supabase
          .from('cart_items')
          .delete()
          .eq('user_id', user.id)
          .eq('product_id', productId);
        
        if (error) throw error;
      } else {
        const cart = localCart.filter(item => item.productId !== productId);
        setLocalCart(cart);
        localStorage.setItem('cart', JSON.stringify(cart));
      }
    },
    onSuccess: () => {
      if (user) {
        queryClient.invalidateQueries({ queryKey: ['cart', user.id] });
      }
    },
  });

  const updateQuantityMutation = useMutation({
    mutationFn: async ({ productId, quantity }: { productId: string; quantity: number }) => {
      if (quantity <= 0) {
        return removeFromCartMutation.mutateAsync(productId);
      }
      
      if (user) {
        const { error } = await supabase
          .from('cart_items')
          .update({ quantity })
          .eq('user_id', user.id)
          .eq('product_id', productId);
        
        if (error) throw error;
      } else {
        const cart = localCart.map(item => 
          item.productId === productId 
            ? { ...item, quantity }
            : item
        );
        setLocalCart(cart);
        localStorage.setItem('cart', JSON.stringify(cart));
      }
    },
    onSuccess: () => {
      if (user) {
        queryClient.invalidateQueries({ queryKey: ['cart', user.id] });
      }
    },
  });

  const cart = user ? dbCart : localCart;
  const cartCount = cart.length;

  return {
    cart,
    cartCount,
    isLoading: user ? isLoading : false,
    addToCart: addToCartMutation.mutate,
    removeFromCart: removeFromCartMutation.mutate,
    updateQuantity: updateQuantityMutation.mutate,
  };
}
