import { Asset, AssetType } from "../../entities/Asset";
import { AssetRepository, CreateAssetUseCase } from "../interfaces";

export class CreateAsset implements CreateAssetUseCase {
  constructor(private readonly repository: AssetRepository) {}

  execute(
    belongsTo: number,
    icon: string,
    background: string,
    name: string,
    type: AssetType,
    value: number,
    cost: number,
    acquiredDate: number,
    note: string,
  ): Asset {
    const asset = new Asset(
      this.repository.getNextId(),
      icon,
      background,
      name,
      type,
      value,
      cost,
      acquiredDate,
      note,
      belongsTo,
    );

    this.repository.save(asset);

    return asset;
  }
}
