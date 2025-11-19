import { useState, useEffect } from 'react';

// A simple implementation similar to MutableStateFlow
export class StateFlow<T> {
  private value: T;
  private listeners: ((value: T) => void)[] = [];

  constructor(initialValue: T) {
    this.value = initialValue;
  }

  getValue(): T {
    return this.value;
  }

  setValue(newValue: T): void {
    this.value = newValue;
    this.notifyListeners();
  }

  subscribe(listener: (value: T) => void): () => void {
    this.listeners.push(listener);
    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.value));
  }
}

// Custom hook to use the state flow in React components (similar to collectAsState)
export function useStateFlow<T>(stateFlow: StateFlow<T>): T {
  const [state, setState] = useState<T>(stateFlow.getValue());
  
  useEffect(() => {
    const unsubscribe = stateFlow.subscribe(newValue => {
      setState(newValue);
    });
    
    // Clean up subscription
    return unsubscribe;
  }, [stateFlow]);
  
  return state;
}