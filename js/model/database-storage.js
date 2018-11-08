class DBFirebase{
    saveDBNews(collectionName,newsesData){
        return db.collection(collectionName).add(newsesData);
    }

    getDBNews(collectionName){
      return db.collection(collectionName).get();
    }


    getTimeLebel(){
        return db.collection('timeLabel').get();
    }

    addTimeLebel(freshLabel){
        return db.collection('timeLabel').add(freshLabel);
    }

    setTimeLebel(docId,replaceLabelData){
        return db.collection('timeLabel').doc(docId).set(replaceLabelData);
    }

}