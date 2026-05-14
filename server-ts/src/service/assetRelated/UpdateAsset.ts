import { Asset, AssetType } from "../../entities/Asset";
import { AssetRepository, UpdateAssetUseCase } from "../interfaces";

export class UpdateAsset implements UpdateAssetUseCase {
  constructor(private readonly repository: AssetRepository) {}

  execute(
    assetId: number,
    updates: {
      name?: string;
      type?: AssetType;
      value?: number;
      cost?: number;
      note?: string;
    },
  ): Asset {
    const asset = this.repository.getById(assetId);

    if (!asset) {
      throw new Error("Asset not found");
    }

    if (updates.name !== undefined) {
      asset.changeName(updates.name);
    }

    if (updates.type !== undefined) {
      asset.changeType(updates.type);
    }

    if (updates.value !== undefined) {
      asset.changeValue(updates.value);
    }

    if (updates.cost !== undefined) {
      asset.changeCost(updates.cost);
    }

    if (updates.note !== undefined) {
      asset.changeNote(updates.note);
    }

    this.repository.update(asset);

    return asset;
  }
}
