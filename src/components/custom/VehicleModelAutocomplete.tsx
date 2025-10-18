'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, X } from 'lucide-react';

interface Option {
  code: string;
  name: string;
}

interface VehicleModelAutocompleteProps {
  options: Option[];
  value: string;
  onChange: (code: string, name: string) => void;
  disabled?: boolean;
  placeholder?: string;
  loading?: boolean;
  className?: string;
}

export const VehicleModelAutocomplete: React.FC<VehicleModelAutocompleteProps> = ({
  options,
  value,
  onChange,
  disabled = false,
  placeholder = 'Digite ou selecione o modelo',
  loading = false,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Get the display name from the selected value
  const selectedOption = options.find(opt => opt.code === value);
  const displayValue = selectedOption ? selectedOption.name : '';

  // Filter options based on search term
  const filteredOptions = searchTerm
    ? options.filter(option =>
        option.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Scroll highlighted item into view
  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      const highlightedElement = listRef.current.children[highlightedIndex] as HTMLElement;
      if (highlightedElement) {
        highlightedElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }, [highlightedIndex]);

  // Reset highlighted index when filtered options change
  useEffect(() => {
    setHighlightedIndex(-1);
  }, [searchTerm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsOpen(true);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleOptionClick = (option: Option) => {
    onChange(option.code, option.name);
    setSearchTerm('');
    setIsOpen(false);
    inputRef.current?.blur();
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('', '');
    setSearchTerm('');
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        setIsOpen(true);
        return;
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev =>
          prev < filteredOptions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
          handleOptionClick(filteredOptions[highlightedIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        setSearchTerm('');
        inputRef.current?.blur();
        break;
      case 'Tab':
        setIsOpen(false);
        setSearchTerm('');
        break;
    }
  };

  const handleToggleDropdown = () => {
    if (disabled || loading) return;
    
    if (isOpen) {
      setIsOpen(false);
      setSearchTerm('');
    } else {
      setIsOpen(true);
      inputRef.current?.focus();
    }
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="relative">
        <div
          className={`
            flex items-center w-full rounded border px-4 py-3
            ${disabled || loading ? 'bg-gray-100 cursor-not-allowed' : 'bg-white cursor-text'}
            ${isOpen ? 'border-gabardo-blue ring-1 ring-gabardo-blue' : 'border-neutral-300'}
            transition-all duration-200
          `}
          onClick={() => !disabled && !loading && inputRef.current?.focus()}
        >
          <Search className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
          
          <input
            ref={inputRef}
            type="text"
            value={searchTerm || displayValue}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onKeyDown={handleKeyDown}
            disabled={disabled || loading}
            placeholder={disabled ? (loading ? 'Carregando...' : placeholder) : placeholder}
            className="flex-1 outline-none bg-transparent text-gray-900 placeholder-gray-400 disabled:cursor-not-allowed"
            autoComplete="off"
            role="combobox"
            aria-expanded={isOpen}
            aria-controls="model-listbox"
            aria-autocomplete="list"
          />

          {displayValue && !loading && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors mr-1 flex-shrink-0"
              aria-label="Limpar seleção"
            >
              <X className="h-4 w-4 text-gray-400" />
            </button>
          )}

          <button
            type="button"
            onClick={handleToggleDropdown}
            disabled={disabled || loading}
            className="p-1 flex-shrink-0 disabled:cursor-not-allowed"
            aria-label={isOpen ? 'Fechar opções' : 'Abrir opções'}
          >
            <ChevronDown
              className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
                isOpen ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>

        {isOpen && !disabled && !loading && (
          <ul
            ref={listRef}
            id="model-listbox"
            role="listbox"
            className="absolute z-50 mt-1 w-full max-h-60 overflow-auto rounded-md border border-neutral-300 bg-white shadow-lg"
          >
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <li
                  key={option.code}
                  role="option"
                  aria-selected={option.code === value}
                  onClick={() => handleOptionClick(option)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  className={`
                    px-4 py-2 cursor-pointer transition-colors
                    ${option.code === value ? 'bg-gabardo-blue text-white font-medium' : ''}
                    ${highlightedIndex === index && option.code !== value ? 'bg-blue-50' : ''}
                    ${option.code !== value && highlightedIndex !== index ? 'hover:bg-gray-50' : ''}
                  `}
                >
                  {option.name}
                </li>
              ))
            ) : (
              <li className="px-4 py-3 text-gray-500 text-center">
                {searchTerm ? 'Nenhum modelo encontrado' : 'Selecione uma marca primeiro'}
              </li>
            )}
          </ul>
        )}
      </div>

      {/* Screen reader announcements */}
      <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {isOpen && filteredOptions.length > 0 && (
          `${filteredOptions.length} modelo${filteredOptions.length !== 1 ? 's' : ''} disponível${filteredOptions.length !== 1 ? 'is' : ''}`
        )}
      </div>
    </div>
  );
};
