export class Service {
  constructor(
    public id: number,
    public status: string,
    public description: string,
    public observations: string,
    public startDate: Date,
    public endDate: Date,
    public tests: string,
    public components: string,
  ) { }
}

