export interface RawMaterial {
  id: number;
  name: string;
  unit_count: number;
  created_at: string;
  updated_at: string;
  unit: number | null;
}

export enum MaterialUnit {
  KILOGRAM = 1,
  METER = 2,
  PIECE = 3,
}

export const MaterialUnitLabels = new Map<MaterialUnit, string>([
  [MaterialUnit.METER, 'متر'],
  [MaterialUnit.PIECE, 'قطعة'],
  [MaterialUnit.KILOGRAM, 'كجم'],
]);
