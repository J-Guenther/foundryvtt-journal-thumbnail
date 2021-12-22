class Thumbnail {
    static addToEntries(app, html) {
        const lis = html.find('li.journalentry');
        for (const li of lis) {
            const target = $(li);
            const id = target.data('document-id');
            const journalEntry = game.journal.get(id);
            
            if (journalEntry?.data?.img) {
                const thumbnail = $('<img class="thumbnail" src="' + journalEntry.data.img + '" alt="Journal Entry Thumbnail">');
                target.append(thumbnail);
            }
        }
    }
}

Hooks.on('renderJournalDirectory', Thumbnail.addToEntries);