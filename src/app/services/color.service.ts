import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  private colors = [
    { background: '#4CAF50', border: '#388E3C' }, // Grün
    { background: '#9C27B0', border: '#7B1FA2' }, // Lila
    { background: '#FF9800', border: '#F57C00' }, // Orange
    { background: '#F44336', border: '#D32F2F' }, // Rot
    { background: '#009688', border: '#00796B' }, // Türkis
    { background: '#673AB7', border: '#512DA8' }, // Violett
    { background: '#FF5722', border: '#E64A19' }, // Deep Orange
    { background: '#795548', border: '#5D4037' }, // Braun
    { background: '#607D8B', border: '#455A64' }  // Blau Grau
  ];

  private colorMap: Map<string, { background: string; border: string }> = new Map();
  private nextColorIndex = 0;

  getColorForName(name: string): { background: string; border: string } {
    if (this.colorMap.has(name)) {
      return this.colorMap.get(name)!;
    }

    const color = this.colors[this.nextColorIndex];
    this.colorMap.set(name, color);
    this.nextColorIndex = (this.nextColorIndex + 1) % this.colors.length;
    return color;
  }
} 