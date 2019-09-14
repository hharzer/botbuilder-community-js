import { Engine } from '@botbuildercommunity/middleware-engine-core';
import { GoogleCloudOptions } from './schema';
import { LanguageServiceClient } from '@google-cloud/language';

/**
 * @module botbuildercommunity/middleware-google-cloud
 */

export class GoogleCloudEngine extends Engine {
    public client: any;
    public options: GoogleCloudOptions;
    public lang: string;
    public constructor(options?: any) {
        super();
        this.options = options;
        this.lang = this.options.lang || 'en';
        this.client = new LanguageServiceClient(this.options);
    }
    public async entities(input: any): Promise<any> {
        const params = {
            type: 'PLAIN_TEXT',
            context: input.documents[0].text
        };
        const result = await this.client.analyzeEntities({params});
        return Promise.resolve({
            documents: [
                {
                    entities: result.map((e: any): string => e.name)
                }
            ]
        });
    }
    public async keyPhrases(input: any): Promise<any> {
        return Promise.reject(`[keyPhrases] is not supported by this engine. "${ input }" cannot be processed`);
    }
    public async detectLanguage(input: any): Promise<any> {
        return Promise.reject(`[detectLanguage] is not supported by this engine. "${ input }" cannot be processed`);
    }
    public async sentiment(input: any): Promise<any> {
        const params = {
            type: 'PLAIN_TEXT',
            context: input.documents[0].text
        };
        const result = await this.client.analyzeSentiment({params});
        return Promise.resolve({
            documents: [
                {
                    score: result.documentSentiment.score
                }
            ]
        });
    }
    public async categories(input: any): Promise<any> {
        const params = {
            type: 'PLAIN_TEXT',
            context: input.documents[0].text
        };
        const result = await this.client.classifyText({params});
        return Promise.resolve({
            documents: [
                {
                    categories: result.categories.map((e: any): string => e.name)
                }
            ]
        });
    }
    public async concepts(input: string): Promise<any> {
        return Promise.reject(`[concepts] is not supported by this engine. "${ input }" cannot be processed`);
    }
    public async emotion(input: string): Promise<any> {
        return Promise.reject(`[emotion] is not supported by this engine. "${ input }" cannot be processed`);
    }
}
