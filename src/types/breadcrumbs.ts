export type BreadcrumbsType = {
  name: string;
  subhead: Array<SubheadObject>;
  path?: string;
  icon?: React.ReactElement;
};

export type SubheadObject = {
  name: string;
  path: string;
};
