import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {Observable} from 'rxjs';
import {ApolloQueryResult} from 'apollo-client';

@Injectable({
    providedIn: 'root'
})
export class RecordGQL {

    constructor(private apollo: Apollo) {
    }

    /**
     * Fetch data either from backend or cache
     *
     * @param module to get from
     * @param id of the record
     * @param metadata with the fields to ask for
     */
    public fetch(module: string, id: string, metadata: { fields: string[] }): Observable<ApolloQueryResult<any>> {
        const fields = metadata.fields;

        const queryOptions = {
            query: gql`
              query ${module}($id: ID!) {
                ${module}(id: $id) {
                  ${fields.join('\n')}
                }
              }
            `,
            variables: {
                id: id,
            },
        };

        return this.apollo.query(queryOptions);
    }
}