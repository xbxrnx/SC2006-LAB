import React, { useState } from 'react';
import { Checkbox } from '~/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { ChevronDown, Search } from 'lucide-react';
import { UserButton } from "@clerk/nextjs";

// Define TypeScript interface
interface TopBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  evCharging: boolean;
  setEvCharging: (checked: boolean) => void;
  shelteredCarpark: boolean;
  setShelteredCarpark: (checked: boolean) => void;
  onSearch: () => void; // Added new prop for search functionality
}

// TopBar Component
export const TopBar: React.FC<TopBarProps> = ({ 
  searchQuery, 
  setSearchQuery, 
  evCharging, 
  setEvCharging, 
  shelteredCarpark, 
  setShelteredCarpark,
  onSearch
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle form submission - prevent default and trigger search
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  // Handle pressing Enter in search input
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <header className="bg-blue-500 text-white p-4 relative">
      <div className="container mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Add ParkSMART logo and UserButton */}
        <div className="flex justify-between items-center w-full md:w-auto">
          <h1 className="text-2xl font-bold">Parking made Smarter</h1>
          <div className="md:hidden">
            <UserButton />
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-2 items-start md:items-center flex-grow md:ml-6">
          <form onSubmit={handleSubmit} className="flex">
            <Input
              type="text"
              placeholder="Search for a Carpark..."
              className="mr-2 w-64 bg-white text-black border-white focus:border-white focus-visible:ring-0 focus-visible:ring-offset-0"
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
            />
            <Button 
              type="submit" 
              variant="secondary" 
              className="bg-white text-black hover:bg-gray-100"
            >
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </form>
          
          <div className="flex items-center ml-0 md:ml-4 space-x-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="ev-charging" 
                checked={evCharging}
                onCheckedChange={(checked) => setEvCharging(checked as boolean)}
                className="border-white data-[state=checked]:bg-white data-[state=checked]:text-blue-500"
              />
              <label htmlFor="ev-charging" className="text-sm font-medium">
                EV Charging
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="sheltered" 
                checked={shelteredCarpark}
                onCheckedChange={(checked) => setShelteredCarpark(checked as boolean)}
                className="border-white data-[state=checked]:bg-white data-[state=checked]:text-blue-500"
              />
              <label htmlFor="sheltered" className="text-sm font-medium">
                Sheltered Carpark
              </label>
            </div>
          </div>
          
          <div className="flex items-center ml-0 md:ml-auto space-x-4 relative">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center justify-between px-3 py-2 bg-white text-blue-500 rounded-md hover:bg-gray-100 transition-colors font-medium text-sm min-w-32">
                <span>Sort By</span>
                <ChevronDown className="ml-2 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="min-w-36 mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
                <DropdownMenuLabel className="text-gray-500 text-xs font-semibold px-3 py-2">
                  SORT OPTIONS
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-200 h-px" />
                <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer hover:bg-blue-50 hover:text-blue-600 transition-colors">
                  Alphabetical Order
                </DropdownMenuItem>
                <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer hover:bg-blue-50 hover:text-blue-600 transition-colors">
                  Price: Low to High
                </DropdownMenuItem>
                <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer hover:bg-blue-50 hover:text-blue-600 transition-colors">
                  Price: High to Low
                </DropdownMenuItem>
                <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer hover:bg-blue-50 hover:text-blue-600 transition-colors">
                  Availability
                </DropdownMenuItem>
                <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer hover:bg-blue-50 hover:text-blue-600 transition-colors">
                  Distance
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {/* UserButton - visible on desktop */}
            <div className="hidden md:block">
              <UserButton />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};