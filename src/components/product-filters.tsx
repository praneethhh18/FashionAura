
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { SheetHeader, SheetTitle, SheetClose } from '@/components/ui/sheet';
import { ScrollArea } from './ui/scroll-area';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/lib/utils';

type FilterKeys = 'genders' | 'sizes' | 'priceRange' | 'colors' | 'waterproofness' | 'lacing';

type Filters = {
    genders: string[];
    sizes: string[];
    priceRange: [number, number];
    colors: string[];
    waterproofness: string[];
    lacing: string[];
};

interface ProductFiltersProps {
    initialFilters: Partial<Filters>;
    onFiltersChange: (filters: any) => void;
    onClose: () => void;
    productCount: number;
    onClear: () => void;
    availableFilters?: FilterKeys[];
}


const allSizes = [
    'M10.5 - W11.5', 'M10 - W11', 'M11.5 - W12.5', 'M11 - W12', 'M12.5 - W13.5',
    'M12 - W13', 'M13 - W14', 'M4.5 - W5.5', 'M4 - W5', 'M5.5 - W6.5',
    'M5 - W6', 'M6.5 - W7.5', 'M6 - W7', 'M7.5 - W8.5', 'M7 - W8',
    'M8.5 - W9.5', 'M8 - W9', 'M9.5 - W10.5'
];

const allColors = [
    { name: 'Black', hex: '#000000' },
    { name: 'Blue', hex: '#3b82f6' },
    { name: 'Green', hex: '#22c55e' },
    { name: 'Purple', hex: '#8b5cf6' },
    { name: 'Brown', hex: '#a16207' },
    { name: 'Grey', hex: '#6b7280' },
    { name: 'Red', hex: '#ef4444' },
    { name: 'Yellow', hex: '#eab308' },
    { name: 'Orange', hex: '#f97316' },
    { name: 'Pink', hex: '#ec4899' },
    { name: 'White', hex: '#ffffff' },
];

const defaultFilters: Filters = {
    genders: [],
    sizes: [],
    priceRange: [0, 20000],
    colors: [],
    waterproofness: [],
    lacing: [],
};


export function ProductFilters({ 
    initialFilters, 
    onFiltersChange, 
    onClose, 
    productCount, 
    onClear, 
    availableFilters = ['genders', 'sizes', 'priceRange', 'colors', 'waterproofness', 'lacing'] 
}: ProductFiltersProps) {
    const [localFilters, setLocalFilters] = useState({ ...defaultFilters, ...initialFilters });
    const [sort, setSort] = useState("featured");

    useEffect(() => {
        setLocalFilters({ ...defaultFilters, ...initialFilters });
    }, [initialFilters]);

    const handleApply = () => {
        onFiltersChange(localFilters);
        onClose();
    };

    const handleClear = () => {
        onClear();
        onClose();
    }
    
    const handleMultiSelect = (key: keyof Omit<Filters, 'priceRange'>, value: string) => {
        setLocalFilters(prev => {
            const current = prev[key] as string[];
            const newValues = current.includes(value)
                ? current.filter(v => v !== value)
                : [...current, value];
            return { ...prev, [key]: newValues };
        });
    };

    const isFilterVisible = (filter: FilterKeys) => availableFilters.includes(filter);

    return (
        <div className="flex flex-col h-full">
            <SheetHeader className="p-6 border-b">
                <div className="flex justify-between items-center">
                    <SheetTitle className="text-xl font-bold">Filter & sort</SheetTitle>
                    <SheetClose asChild>
                        <Button variant="ghost" size="icon">
                            <X className="h-5 w-5" />
                        </Button>
                    </SheetClose>
                </div>
            </SheetHeader>
            <ScrollArea className="flex-grow p-6">
                <div className="space-y-8">
                    {/* Sort By */}
                    <div>
                        <Label className="text-sm font-semibold">Sort by</Label>
                        <Select value={sort} onValueChange={setSort}>
                            <SelectTrigger className="mt-2 h-12">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="featured">Featured</SelectItem>
                                <SelectItem value="newest">Newest</SelectItem>
                                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {isFilterVisible('genders') && (
                        <>
                            <Separator />
                            <div>
                                <Label className="text-sm font-semibold">Gender</Label>
                                <div className="flex flex-col space-y-2 mt-3">
                                   {['Unisex', 'Men', 'Women'].map(gender => (
                                        <div key={gender} className="flex items-center space-x-2">
                                            <Checkbox 
                                                id={`gender-${gender.toLowerCase()}`}
                                                checked={localFilters.genders.includes(gender)}
                                                onCheckedChange={() => handleMultiSelect('genders', gender)}
                                            />
                                            <Label htmlFor={`gender-${gender.toLowerCase()}`} className="font-normal">{gender}</Label>
                                        </div>
                                   ))}
                                </div>
                            </div>
                        </>
                    )}
                    
                    {isFilterVisible('sizes') && (
                        <>
                            <Separator />
                            <div>
                                <Label className="text-sm font-semibold">Size</Label>
                                <div className="grid grid-cols-3 gap-2 mt-3">
                                    {allSizes.map(size => (
                                        <Button 
                                            key={size} 
                                            variant={localFilters.sizes.includes(size) ? "default" : "outline"} 
                                            className="font-normal"
                                            onClick={() => handleMultiSelect('sizes', size)}
                                        >
                                            {size}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}

                    {isFilterVisible('priceRange') && (
                        <>
                            <Separator />
                            <div>
                                <Label className="text-sm font-semibold">Price</Label>
                                <Slider
                                    value={localFilters.priceRange}
                                    max={20000}
                                    min={0}
                                    step={500}
                                    onValueChange={(value) => setLocalFilters(f => ({...f, priceRange: value as [number, number]}))}
                                    className="mt-4"
                                />
                                 <div className="flex justify-between items-center mt-3">
                                    <div className="flex flex-col">
                                        <Label htmlFor="min-price" className="text-xs text-muted-foreground">Min (INR)</Label>
                                        <Input id="min-price" type="text" value={formatPrice(localFilters.priceRange[0])} className="w-24 h-10 mt-1" readOnly/>
                                    </div>
                                     <div className="flex flex-col items-end">
                                        <Label htmlFor="max-price" className="text-xs text-muted-foreground">Max (INR)</Label>
                                        <Input id="max-price" type="text" value={formatPrice(localFilters.priceRange[1])} className="w-24 h-10 mt-1 text-right" readOnly/>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {isFilterVisible('colors') && (
                        <>
                            <Separator />
                            <div>
                                <Label className="text-sm font-semibold">Color</Label>
                                <div className="grid grid-cols-2 gap-x-4 gap-y-3 mt-3">
                                    {allColors.map(color => (
                                        <div key={color.name} className="flex items-center gap-3">
                                            <button 
                                                className={cn("h-6 w-6 rounded-full border-2", localFilters.colors.includes(color.name) ? 'border-primary' : 'border-transparent' )}
                                                onClick={() => handleMultiSelect('colors', color.name)}
                                            >
                                                <div className={cn("h-full w-full rounded-full border border-gray-300")} style={{ backgroundColor: color.hex }}></div>
                                            </button>
                                            <span className="text-sm">{color.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}

                    {isFilterVisible('waterproofness') && (
                        <>
                            <Separator />
                            <div>
                                <Label className="text-sm font-semibold">Waterproofness</Label>
                                <div className="space-y-2 mt-3">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox 
                                            id="none"
                                            checked={localFilters.waterproofness.includes('None')}
                                            onCheckedChange={() => handleMultiSelect('waterproofness', 'None')}
                                        />
                                        <Label htmlFor="none" className="font-normal">None</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox 
                                            id="goretex" 
                                            checked={localFilters.waterproofness.includes('GORE-TEX')}
                                            onCheckedChange={() => handleMultiSelect('waterproofness', 'GORE-TEX')}
                                        />
                                        <Label htmlFor="goretex" className="font-normal">GORE-TEX</Label>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {isFilterVisible('lacing') && (
                        <>
                            <Separator />
                             <div>
                                <Label className="text-sm font-semibold">Lacing system</Label>
                                <div className="space-y-2 mt-3">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox 
                                            id="quicklace" 
                                            checked={localFilters.lacing.includes('Quicklace®')}
                                            onCheckedChange={() => handleMultiSelect('lacing', 'Quicklace®')}
                                        />
                                        <Label htmlFor="quicklace" className="font-normal">Quicklace®</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox 
                                            id="regular"
                                            checked={localFilters.lacing.includes('Regular laces')}
                                            onCheckedChange={() => handleMultiSelect('lacing', 'Regular laces')}
                                        />
                                        <Label htmlFor="regular" className="font-normal">Regular laces</Label>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                </div>
            </ScrollArea>
            <div className="p-6 border-t bg-background">
                <div className="flex gap-4">
                    <Button variant="outline" className="w-full" onClick={handleClear}>Clear all</Button>
                    <Button className="w-full" onClick={handleApply}>View {productCount}</Button>
                </div>
            </div>
        </div>
    );
}
