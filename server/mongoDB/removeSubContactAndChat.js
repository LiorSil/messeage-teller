// removeSubContactAndChat.js

const lior = db.contacts.findOne({ name: "Lior Silman" });
const arie = db.contacts.findOne({ name: "Arie Silman" });

if (lior && arie) {
  const liorId = lior._id;
  const arieId = arie._id;

  // Remove the reference to Arie from Lior's subContacts
  db.contacts.updateOne({ _id: liorId }, { $pull: { subContacts: arieId } });

  // Remove the chat document where both Lior and Arie are participants
  db.chats.deleteOne({
    participants: { $all: [liorId, arieId] },
  });

  print("Successfully removed subContact and chat document.");
} else {
  print("Either Lior Silman or Arie Silman not found.");
}
