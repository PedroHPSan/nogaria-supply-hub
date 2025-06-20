
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { Product, CartItem } from '@/types/database';
import { useToast } from './use-toast';

interface CartProduct extends Product {
  quantity: number;
}

interface LocalCartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export const useCart = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [cart, setCart] = useState<(CartItem | LocalCartItem)[]>([]);
  const [cartCount, setCartCount] = useState(0);

  // Load cart on mount
  useEffect(() => {
    if (user) {
      loadDatabaseCart();
    } else {
      loadLocalCart();
    }
  }, [user]);

  // Update cart count when cart changes
  useEffect(() => {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    setCartCount(count);
  }, [cart]);

  const loadDatabaseCart = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('cart_items')
        .select(`
          *,
          product:products(*)
        `)
        .eq('user_id', user.id);

      if (error) throw error;
      setCart(data || []);
    } catch (error) {
      console.error('Error loading cart:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar o carrinho.",
        variant: "destructive"
      });
    }
  };

  const loadLocalCart = () => {
    const localCart = localStorage.getItem('cart');
    if (localCart) {
      try {
        setCart(JSON.parse(localCart));
      } catch (error) {
        console.error('Error parsing local cart:', error);
        setCart([]);
      }
    } else {
      setCart([]);
    }
  };

  const saveLocalCart = (cartItems: LocalCartItem[]) => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    setCart(cartItems);
  };

  const addToCart = async ({ productId, quantity = 1 }: { productId: string; quantity?: number }) => {
    if (user) {
      // Database cart for authenticated users
      try {
        // First, get the product details
        const { data: product, error: productError } = await supabase
          .from('products')
          .select('*')
          .eq('id', productId)
          .single();

        if (productError) throw productError;

        // Check if item already exists in cart
        const { data: existingItem, error: checkError } = await supabase
          .from('cart_items')
          .select('*')
          .eq('user_id', user.id)
          .eq('product_id', productId)
          .single();

        if (checkError && checkError.code !== 'PGRST116') throw checkError;

        if (existingItem) {
          // Update quantity
          const { error: updateError } = await supabase
            .from('cart_items')
            .update({ quantity: existingItem.quantity + quantity })
            .eq('id', existingItem.id);

          if (updateError) throw updateError;
        } else {
          // Insert new item
          const { error: insertError } = await supabase
            .from('cart_items')
            .insert({
              user_id: user.id,
              product_id: productId,
              quantity
            });

          if (insertError) throw insertError;
        }

        await loadDatabaseCart();
        
        toast({
          title: "Produto adicionado",
          description: `${product.name} foi adicionado ao carrinho.`
        });
      } catch (error) {
        console.error('Error adding to cart:', error);
        toast({
          title: "Erro",
          description: "Não foi possível adicionar o produto ao carrinho.",
          variant: "destructive"
        });
      }
    } else {
      // Local cart for anonymous users
      try {
        const { data: product, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', productId)
          .single();

        if (error) throw error;

        const localCart = [...cart] as LocalCartItem[];
        const existingItemIndex = localCart.findIndex(item => item.id === productId);

        if (existingItemIndex > -1) {
          localCart[existingItemIndex].quantity += quantity;
        } else {
          localCart.push({
            id: productId,
            name: product.name,
            price: product.price || 0,
            quantity
          });
        }

        saveLocalCart(localCart);
        
        toast({
          title: "Produto adicionado",
          description: `${product.name} foi adicionado ao carrinho.`
        });
      } catch (error) {
        console.error('Error adding to local cart:', error);
        toast({
          title: "Erro",
          description: "Não foi possível adicionar o produto ao carrinho.",
          variant: "destructive"
        });
      }
    }
  };

  const removeFromCart = async (itemId: string) => {
    if (user) {
      try {
        const { error } = await supabase
          .from('cart_items')
          .delete()
          .eq('id', itemId);

        if (error) throw error;
        await loadDatabaseCart();
      } catch (error) {
        console.error('Error removing from cart:', error);
        toast({
          title: "Erro",
          description: "Não foi possível remover o produto do carrinho.",
          variant: "destructive"
        });
      }
    } else {
      const localCart = (cart as LocalCartItem[]).filter(item => item.id !== itemId);
      saveLocalCart(localCart);
    }
  };

  const updateQuantity = async ({ productId, quantity }: { productId: string; quantity: number }) => {
    if (quantity <= 0) {
      await removeFromCart(productId);
      return;
    }

    if (user) {
      try {
        const { error } = await supabase
          .from('cart_items')
          .update({ quantity })
          .eq('user_id', user.id)
          .eq('product_id', productId);

        if (error) throw error;
        await loadDatabaseCart();
      } catch (error) {
        console.error('Error updating quantity:', error);
        toast({
          title: "Erro",
          description: "Não foi possível atualizar a quantidade.",
          variant: "destructive"
        });
      }
    } else {
      const localCart = [...cart] as LocalCartItem[];
      const itemIndex = localCart.findIndex(item => item.id === productId);
      
      if (itemIndex > -1) {
        localCart[itemIndex].quantity = quantity;
        saveLocalCart(localCart);
      }
    }
  };

  const clearCart = async () => {
    if (user) {
      try {
        const { error } = await supabase
          .from('cart_items')
          .delete()
          .eq('user_id', user.id);

        if (error) throw error;
        setCart([]);
      } catch (error) {
        console.error('Error clearing cart:', error);
      }
    } else {
      saveLocalCart([]);
    }
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      if ('product' in item && item.product) {
        return total + (Number(item.product.price) || 0) * item.quantity;
      } else if ('price' in item) {
        return total + (Number(item.price) || 0) * item.quantity;
      }
      return total;
    }, 0);
  };

  return {
    cart,
    cartCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    loadDatabaseCart,
    loadLocalCart
  };
};
