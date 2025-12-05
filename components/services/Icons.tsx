import React from 'react';
import { Sparkles, Search, Loader2, X, ArrowRight } from 'lucide-react';

export const SparklesIcon = ({ className }: { className?: string }) => <Sparkles className={className} />;
export const SearchIcon = ({ className }: { className?: string }) => <Search className={className} />;
export const LoaderIcon = ({ className }: { className?: string }) => <Loader2 className={className} />;
export const XIcon = ({ className }: { className?: string }) => <X className={className} />;
export const ArrowRightIcon = ({ className }: { className?: string }) => <ArrowRight className={className} />;
