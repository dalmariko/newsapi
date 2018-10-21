class DBFirebase{
    save(newsesData){
        return db.collection('allgetNews').add(newsesData);
    }

    getLimitNuwses(){
      return db.collection('allgetNews').get();
    }




}