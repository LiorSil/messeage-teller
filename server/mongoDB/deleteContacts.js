db.contacts.updateMany({}, { $set: { contacts: [] } });

// delete chats 

db.chats.deleteMany({},
    {
        $set: {
        chats: []
        }
    }
);
