class DBFirebase{
    saveDBNews(collectionName,newsesData){
        return db.collection(collectionName).add(newsesData);
    }

    getDBNews(collectionName){
      return db.collection(collectionName).get();
    }


    getTimeLebel(){
        return db.collection('timeLabel').orderBy("timeStemp", "desc").limit(5).get();
    }

    addTimeLebel(freshLabel){
        return db.collection('timeLabel').add(freshLabel);
    }

    setTimeLebel(docId,replaceLabelData){
        return db.collection('timeLabel').doc(docId).set(replaceLabelData);
    }


    getDocument(collectionName,docId){
        return db.collection(collectionName).doc(docId).get();
    }

}