import 'mocha';
import { assert, expect } from 'chai'
import { searchBody } from './types/search';
import { searchbar } from './index'

describe('Searchbar class test', () => {
    it('General searchbar functionality ok', async ()=>{
        const searchbarf = new searchbar();

        await searchbarf.searchbar('Hey!').then((result: searchBody)=>{

            expect(result.general[0].value).to.equal('Hey!');
        });
    });

    it('Searchbar functionality error', async ()=>{
        const searchbarf = new searchbar();

        await searchbarf.searchbar('Hey!').then((result: searchBody)=>{

            assert.notEqual(result.general[0].value, 'H');
        });
    });

    it('2 general word search', async ()=>{
        const searchbarf = new searchbar();
        
        await searchbarf.searchbar('Hello World!').then((result: searchBody)=>{
            expect(result.general.length).to.equal(2);
        });
    });

    it('QUOTE word search', async ()=>{
        const searchbarf = new searchbar();
        
        await searchbarf.searchbar('"Hello"').then((result: searchBody)=>{

            expect(result.quote[0].value).to.equal('Hello');
        });
    });

    it('2 quoted word search', async ()=>{
        const searchbarf = new searchbar();
        
        await searchbarf.searchbar('"Hello World"').then((result: searchBody)=>{
            expect(result.general.length).to.equal(2);
        });
    });

    it('FILE extensions', async ()=>{
        const searchbarf = new searchbar();
        
        await searchbarf.searchbar(':pdf').then((result: searchBody)=>{
            expect(result.fileext[0].value).to.equal('pdf');
        });
    });

    it('FOLDER prop search', async ()=>{
        const searchbarf = new searchbar();
        
        await searchbarf.searchbar('#sales').then((result: searchBody)=>{
            expect(result.folder[0].value).to.equal('sales');
        });
    });

    it('WILDCARD prop search', async ()=>{
        const searchbarf = new searchbar();
        
        await searchbarf.searchbar('joa*').then((result: searchBody)=>{
            expect(result.wildcard[0].value).to.equal('joa*');
        });
    });

    it('MINUS prop search', async ()=>{
        const searchbarf = new searchbar();
        
        await searchbarf.searchbar('-pdf').then((result: searchBody)=>{
            expect(result.minus[0].value).to.equal('pdf');
        });
    });

    it('Assert empty arrays on different searchs', async ()=>{
        const searchbarf = new searchbar();
        
        await searchbarf.searchbar('-word').then((result: searchBody)=>{
            assert.isEmpty(result.quote);
            assert.isEmpty(result.folder);
            assert.isEmpty(result.wildcard);
            assert.isEmpty(result.fileext)
            assert.isEmpty(result.general)
        });

        await searchbarf.searchbar('"hello"').then((result: searchBody)=>{
            assert.isEmpty(result.minus);
            assert.isEmpty(result.folder);
            assert.isEmpty(result.wildcard);
            assert.isEmpty(result.fileext)
            assert.isEmpty(result.general)
        });

        await searchbarf.searchbar(':pdf').then((result: searchBody)=>{
            assert.isEmpty(result.minus);
            assert.isEmpty(result.folder);
            assert.isEmpty(result.wildcard);
            assert.isEmpty(result.quote)
            assert.isEmpty(result.general)
        });

        await searchbarf.searchbar('joa*').then((result: searchBody)=>{
            assert.isEmpty(result.minus);
            assert.isEmpty(result.folder);
            assert.isEmpty(result.fileext);
            assert.isEmpty(result.quote)
            assert.isEmpty(result.general)
        });

        await searchbarf.searchbar('types').then((result: searchBody)=>{
            assert.isEmpty(result.minus);
            assert.isEmpty(result.folder);
            assert.isEmpty(result.fileext);
            assert.isEmpty(result.quote)
            assert.isEmpty(result.wildcard)
        });

        await searchbarf.searchbar('#folder').then((result: searchBody)=>{
            assert.isEmpty(result.minus);
            assert.isEmpty(result.general);
            assert.isEmpty(result.fileext);
            assert.isEmpty(result.quote)
            assert.isEmpty(result.wildcard)
        });
    });
})