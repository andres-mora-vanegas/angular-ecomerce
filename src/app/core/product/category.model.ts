export class CategoryModel {
  public id: number;
  public name: string;
  public sublevels: Array<CategoryModel>;
}
