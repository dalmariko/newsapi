class DBFirebase{
    saveDBNews(collectionName,newsesData){
        return db.collection(collectionName).add(newsesData);
    }

    getDBNews(collectionName){
      return db.collection(collectionName).get();
    }




}