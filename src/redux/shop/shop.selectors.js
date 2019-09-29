import { createSelector } from 'reselect'

const selectShop = state => state.shop;

export const selectCollections = createSelector(
    [selectShop],
    shop => shop.collections
)

export const selectCollectionsForPreview = createSelector(
    [selectCollections],
    collections => collections ? Object.keys(collections).map(key => collections[key]) : []
)

export const selectCollection = collectionUrlParam => 
    createSelector(
        [selectCollections],
        collections => (collections ? collections[collectionUrlParam] : null)
        //collections => collections.find(collection => collection.id === COLLECTION_ID_MAP[collectionUrlParam]) array version
    )