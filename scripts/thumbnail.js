class Thumbnail {
    static addToEntries(app, html) {
        const lis = html.find('li.journalentry');
        for (const li of lis) {
            const target = $(li);
            const id = target.data('document-id');
            const journalEntry = game.journal.get(id);
            
            if(journalEntry?.data?.document?.pages.size > 0) {
                const iterator = journalEntry?.data?.document?.pages.values()
                const firstJournalPage = iterator.next().value;
    
                if (firstJournalPage.src) {
                    const thumbnail = $('<img class="thumbnail" src="' + firstJournalPage.src + '" alt="Journal Entry Thumbnail">');
                    target.append(thumbnail);
                }
            }
        }
    }
}

Hooks.on('renderJournalDirectory', Thumbnail.addToEntries);