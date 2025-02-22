import * as Pieces from "@pieces.app/client";
import {SeededAsset, SeedTypeEnum} from "@pieces.app/client";
import {Application} from "@pieces.app/client";

//==============================[/create]==================================//
export function createAsset(applicationData: Application, data: string, name: string) {

  let _seededAsset: SeededAsset = {
      application: applicationData,
      format: {
          fragment: {
              string: { raw: data },
          },
      },
      metadata: {
          name: name
      }
  }

  // create your seed
  let _seed: Pieces.Seed = {
      asset: _seededAsset,
      type: SeedTypeEnum.Asset
  }

  console.log("seed:", _seed)

  // make your api call.
  new Pieces.AssetsApi().assetsCreateNewAsset({seed: _seed}).then(_a => {
      console.log("well howdy", _a);
  })

}
//==============================[.end /create]==================================//

export function deleteAsset(_id: String){

  new Pieces.AssetsApi().assetsSnapshot({}).then(_assetList => {
      for (let i = 0; i < _assetList.iterable.length; i++) {
          if (_assetList.iterable[i].id == _id) {
              new Pieces.AssetsApi().assetsDeleteAsset({asset: _assetList.iterable[i].id }).then(_ => console.log("delete confirmed!"))
          }
      }
  })
}

// used to rename an asset, takes in an _id and _name that comes from the input fields on
// NameInput + DataInput fields.
//
// this uses your asset snapshot to get your list of snippets, then() to get the snippet list back,
// then use the _id to select the snippet from the list of all snippets.
export function renameAsset(_name: string, _id: String){

  new Pieces.AssetsApi().assetsSnapshot({}).then(_assetList => {
      for (let i = 0; i < _assetList.iterable.length; i++) {
          if (_assetList.iterable[i].id == _id) {

              let _asset = _assetList.iterable[i];

              _asset.name = _name;

              new Pieces.AssetApi().assetUpdate({asset: _asset}).then(_updated => {
                  console.log("updated:", _updated);
              })
          }
      }
  })
}