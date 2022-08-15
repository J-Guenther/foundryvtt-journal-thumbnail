class Thumbnail {
    static addToEntries(app, html) {
        console.log('update journal')
        const lis = html.find('li.journalentry');
        for (const li of lis) {
            const target = $(li);
            const id = target.data('document-id');
            const journalEntry = game.journal.get(id);
            
            if(journalEntry?.pages.size > 0) {
                const sortedArray = journalEntry.pages.contents.sort((a,b)=> a.sort - b.sort)
                const firstJournalPage = sortedArray[0];
    
                if (firstJournalPage.src) {
                    const thumbnail = $('<img class="thumbnail" src="' + firstJournalPage.src + '" alt="Journal Entry Thumbnail">');
                    target.append(thumbnail);
                }
            }
        }
    }
    static updateJournalDirectory(app, html) {
        game.journal.render();
    }
}

Hooks.on('renderJournalDirectory', Thumbnail.addToEntries);
Hooks.on('renderJournalSheet', Thumbnail.updateJournalDirectory);