class DBFirebase{
    saveDBNews(newsesData){
        return db.collection('dbnewses').add(newsesData);
    }

    getDBNews(){
      return db.collection('dbnewses').get();
    }




}