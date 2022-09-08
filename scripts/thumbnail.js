class Thumbnail {
    static addToEntries(app, html) {
        console.log('update journal!')
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
                    
                    switch (game.settings.get("journal-thumbnail", "thumbnailPosition")) {
                        case "right": target.append(thumbnail); break;
                        case "left": target.prepend(thumbnail); break;
                      }
                }
            }
        }
    }
    static updateJournalDirectory(app, html) {
        game.journal.render();
    }
}

console.log(game.settings);

Hooks.once("init", function() {
    game.settings.register("journal-thumbnail", "thumbnailPosition", {
        name: "Thumbnail Position",
        hint: "Whether the thumbnail is left of the journal entry title or right",
        scope: "world",
        config: true,
        default: "right",
        type: String,
        choices: {
            right: "Right",
            left: "Left",
        },
        onChange: () => game.journal.render()
    });
});
Hooks.on('renderJournalDirectory', Thumbnail.addToEntries);
Hooks.on('renderJournalSheet', Thumbnail.updateJournalDirectory);
