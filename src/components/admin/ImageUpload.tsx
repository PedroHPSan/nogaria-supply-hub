
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ImageUploadProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  maxImages?: number;
  maxSizeInMB?: number;
}

const ImageUpload = ({ images, onImagesChange, maxImages = 4, maxSizeInMB = 1 }: ImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const validateImage = (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      // Check file size
      if (file.size > maxSizeInMB * 1024 * 1024) {
        toast({
          title: "Erro",
          description: `Imagem muito grande. Máximo ${maxSizeInMB}MB.`,
          variant: "destructive"
        });
        resolve(false);
        return;
      }

      // Check file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Erro",
          description: "Formato não suportado. Use JPG, PNG ou WEBP.",
          variant: "destructive"
        });
        resolve(false);
        return;
      }

      // Check aspect ratio
      const img = new Image();
      img.onload = () => {
        const aspectRatio = img.width / img.height;
        if (Math.abs(aspectRatio - 1) > 0.1) { // Allow 10% tolerance for 1:1 ratio
          toast({
            title: "Aviso",
            description: "Recomendamos imagens quadradas (1:1) para melhor visualização.",
            variant: "default"
          });
        }
        resolve(true);
      };
      img.onerror = () => resolve(false);
      img.src = URL.createObjectURL(file);
    });
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    if (images.length + files.length > maxImages) {
      toast({
        title: "Erro",
        description: `Máximo ${maxImages} imagens permitidas.`,
        variant: "destructive"
      });
      return;
    }

    setUploading(true);
    const newImages: string[] = [];

    for (const file of Array.from(files)) {
      const isValid = await validateImage(file);
      if (isValid) {
        // Convert to base64 for preview (in a real app, you'd upload to Supabase Storage)
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.result) {
            newImages.push(reader.result as string);
            if (newImages.length === files.length) {
              onImagesChange([...images, ...newImages]);
              setUploading(false);
            }
          }
        };
        reader.readAsDataURL(file);
      }
    }

    if (newImages.length === 0) {
      setUploading(false);
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
  };

  return (
    <div className="space-y-4">
      <Label>Imagens do Produto (1-{maxImages} imagens)</Label>
      
      {/* Upload Button */}
      <div className="flex items-center gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading || images.length >= maxImages}
          className="h-20 w-32"
        >
          <div className="flex flex-col items-center gap-2">
            <Upload className="w-6 h-6" />
            <span className="text-xs">
              {uploading ? 'Carregando...' : 'Adicionar'}
            </span>
          </div>
        </Button>
        
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/jpeg,image/jpg,image/png,image/webp"
          onChange={handleFileSelect}
          className="hidden"
        />
        
        <div className="text-sm text-gray-600">
          <p>• Formatos: JPG, PNG, WEBP</p>
          <p>• Tamanho máximo: {maxSizeInMB}MB por imagem</p>
          <p>• Recomendado: 800x800px (quadrado)</p>
        </div>
      </div>

      {/* Image Previews */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <Card key={index} className="relative group">
              <CardContent className="p-2">
                <div className="aspect-square relative">
                  <img
                    src={image}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover rounded-md"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeImage(index)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                  {index === 0 && (
                    <div className="absolute bottom-1 left-1 bg-black/70 text-white text-xs px-1 rounded">
                      Principal
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {images.length === 0 && (
        <Card className="border-dashed border-2 border-gray-300">
          <CardContent className="flex items-center justify-center p-8">
            <div className="text-center text-gray-500">
              <ImageIcon className="w-12 h-12 mx-auto mb-2" />
              <p>Nenhuma imagem adicionada</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ImageUpload;
