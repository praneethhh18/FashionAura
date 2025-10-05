import data from './placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

export const PlaceHolderImages: ImagePlaceholder[] = data.placeholderImages;

export const getImage = (id: string) => {
    const img = PlaceHolderImages.find((p) => p.id === id);
    if (!img) {
        console.warn(`Placeholder image with id "${id}" not found.`);
        return {
        imageUrl: 'https://picsum.photos/seed/placeholder/600/400',
        imageHint: 'placeholder image',
        };
    }
    return { imageUrl: img.imageUrl, imageHint: img.imageHint };
};
