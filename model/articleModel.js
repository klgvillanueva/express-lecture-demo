const articleModel = {};

let lastUsedId = 4566;

const dummyData = [
  { id: 1234, name: 'Example Article 1', title: 'Foo' },
  { id: 2345, name: 'Example Article 2', title: 'Bar' },
  { id: 3456, name: 'Example Article 3', title: 'Baz' },
];

articleModel.find = (searchTerms = {}, cb) => {
  if (searchTerms.id) {
    const art = dummyData.find((d) => d.id === searchTerms.id);
    return art ? cb(undefined, art) : cb('no article found');
  } else return cb(undefined, dummyData);
};

articleModel.create = (data, cb) =>
  cb(undefined, { id: ++lastUsedId, ...data });

articleModel.update = (articleToUpdate, updateData, cb) => {
  if (typeof articleToUpdate === 'object') {
    const art = dummyData.find((d) => d.id === articleToUpdate.id);
    return art
      ? cb(undefined, Object.assign(art, updateData))
      : cb('no matching article found');
  } else if (typeof articleToUpdate === 'number') {
    const art = dummyData.find((d) => d.id === articleToUpdate);
    return art
      ? cb(undefined, Object.assign(art, updateData))
      : cb('no matching article found');
  } else return cb('invalid arg(s) supplied to articleModel.update');
};

articleModel.delete = (articleToDelete, cb) => {
  if (typeof articleToDelete === 'object') {
    const art = dummyData.map((d) => d.id).indexOf(articleToDelete.id);
    return art !== -1
      ? cb(undefined, dummyData.splice(art, 1))
      : cb('no matching article found');
  } else if (typeof articleToDelete === 'number') {
    const art = dummyData.map((d) => d.id).indexOf(articleToDelete);
    return art !== -1
      ? cb(undefined, dummyData.splice(art, 1))
      : cb('no matching article found');
  } else return cb('invalid arg(s) supplied to articleModel.delete');
};

module.exports = articleModel;
