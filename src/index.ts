import { searchBody } from './types/search';

export class searchbar {

	private quoteReg = new RegExp(/"([^']*)"/);
	private filetypeReg = new RegExp(/:([^']*)/);
	// eslint-disable-next-line no-useless-escape
	private folderTypeReg = new RegExp(/\#([^']*)/);
	// eslint-disable-next-line no-useless-escape
	private minusTypeReg = new RegExp(/\-([^']*)/);
	private wildcardTypeReg = new RegExp(/([^']*)\*([^']*)/);

	async searchbar(searchbar: string): Promise<searchBody> {
		return new Promise((resolve, reject) => {
			let searchBody: searchBody = {
				quote: [],
				fileext: [],
				folder: [],
				wildcard: [],
				minus: [],
				general: [],
				raw: searchbar
			};

			const arraySearchbar = searchbar.split(' ');

			if (arraySearchbar) resolve(searchBody = this.processArray(searchBody, arraySearchbar));
			else reject(new Error('Empty searchbar'));
		});
	}

	processArray(searchBody: searchBody, array: Array<string>): searchBody {
		for (const elem of array) {
			const resultOfFiletype = this.filetypeReg.exec(elem);
			const resultOfFoldertype = this.folderTypeReg.exec(elem);
			const resultOfMinustype = this.minusTypeReg.exec(elem);
			const resultOfQuote = this.quoteReg.exec(elem);
			const resultOfWildcardtype = this.wildcardTypeReg.exec(elem);

			if (resultOfFiletype) searchBody.fileext.push({ value: resultOfFiletype[1] });
			else if (resultOfFoldertype) searchBody.folder.push({ value: resultOfFoldertype[1] });
			else if (resultOfMinustype) searchBody.minus.push({ value: resultOfMinustype[1] });
			else if (resultOfWildcardtype) searchBody.wildcard.push({ value: resultOfWildcardtype[0] });
			else if (resultOfQuote) searchBody.quote.push({ value: resultOfQuote[1] });
			else {searchBody.general.push({ value: elem });}
		}

		return searchBody;
	}
}