export interface FeatureSelection {
  id: string;
  title: string;
  attributes: Record<string, unknown>;
  geometry?: unknown;
  layer?: {
    id?: string;
    title?: string;
  };
}
