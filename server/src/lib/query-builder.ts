interface SortParams {
  sort: { [key: string]: 1 | -1 };
}
interface HttpQuery {
  [key: string]: string;
}

export const queryBuilder = {

  getFindOptions({ query = {} }: { query?: HttpQuery } = {}) {
    // const defaultLimit = 50; // set in .env or by collection in model static.
    console.log(typeof query.sort);
    console.log(typeof query.createdAt);
    const {
      fields = null,
      sort = null,
      ...rest
    } = query;
    const mongooseQuery = this.extractQuery(rest);
    const mongooseProjection = this.extractSimpleProjection(fields);
    const mongooseSort = this.extractSort(sort);
    // TODO Pagination! (in options)
    // {skip:10}, {limit:50}
    // TODO embed populate (in options)

    const mongoQueryOptions = {
      filter: mongooseQuery,
      projection: mongooseProjection,
      options: {
        ...mongooseSort,
      },
    };

    console.log(JSON.stringify(mongoQueryOptions, null, 2));
    return mongoQueryOptions;
  },
  extractQuery(queryRest: Record<string, string>): Record<string, string> {
    // Todo: warning ! type validation
    // Check if field exist on model cf > <Model>.schema.obj
    return { ...queryRest };
  },
  extractSort(sortQ: string | null): SortParams | null {
    const sort = {} as SortParams["sort"];
    if (sortQ) {
      if (sortQ.includes("-")) {
        const cleanParam = sortQ.slice(1, sortQ.length); // remove - from param names
        sort[cleanParam] = -1;
      }
      else {
        sort[sortQ] = 1;
      }
      return { sort };
    }
    return null;
  },
  // > https://mongoosejs.com/docs/api.html#query_Query-select
  extractSimpleProjection(fields: string | null): Record<string, number> {
    // Todo: handle exclude/include
    const projOptions: Record<string, number> = {};
    if (fields) {
      const fieldsList = fields.split(",");
      const onlyExclude = fieldsList.filter(elem => elem.includes("-"));
      onlyExclude.forEach((elem) => {
        const cleanParam = elem.slice(1, elem.length); // remove - from param names
        projOptions[cleanParam] = 0;
      });
    }
    return projOptions;
  },
};
