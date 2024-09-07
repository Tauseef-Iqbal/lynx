export interface Assets {
  assets?: Express.Multer.File[];
}

export interface ISocialMedia {
  linkedin?: string;
  facebook?: string;
  youtube?: string;
  instagram?: string;
}

export interface IAssets {
  type: string;
  url: string;
}

export interface IAssetsMetadata {
  type: string;
}
