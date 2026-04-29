import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { SEO } from './SEO';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <SEO title="Something went wrong" description="An unexpected error occurred." />
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
            <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle size={32} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Oops! Something went wrong</h1>
            <p className="text-gray-600 mb-8 leading-relaxed">
              We've encountered an unexpected error. Our team has been notified. 
              Please try refreshing the page or come back later.
            </p>
            <button 
              onClick={() => window.location.href = '/'}
              className="w-full inline-flex items-center justify-center bg-primary hover:bg-secondary text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md shadow-primary/20"
            >
              <RefreshCw className="mr-2" size={18} /> Back to Homepage
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
