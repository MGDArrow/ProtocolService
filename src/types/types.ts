export interface IDate {
  year : number | null;
  month: number | null;
  day  : number | null;
}

export interface IBishop {
  name_first     : string | null;
  name_second    : string | null;
  name_father    : string | null;
  name_monk      : string | null;
  title          : string | null;
  hidden         : boolean;
  date_birth     : IDate | null;
  date_death     : IDate | null;
  date_ordination: IDate | null;
  date_tonsure   : IDate | null;
  date_angel     : IDate | null;
  email          : string | null;
  website        : string | null;
  photo          : string | null;
}
export interface IPriest {
  date_birth : IDate | null;
  date_deacon: IDate | null;
  date_death : IDate | null;
  date_priest: IDate | null;
  hidden     : boolean | null;
  name_father: string | null;
  name_first : string | null;
  name_monk  : string | null;
  name_second: string | null;
  title      : string | null;
}
export interface ISecular {
  date_birth : IDate | null;
  hidden     : boolean | null;
  name_father: string | null;
  name_first : string | null;
  name_second: string | null;
  title      : string | null;
}

export interface IGift {
  name : string;
  count: number;
}

export interface IHistory {
  id         : number;
  create_date: string | null;
  count      : number | null;
  GIFTS: {
    id  : number;
    name: string;
  } | null;
  bishop_id : number | null;
  priest_id : number | null;
  secular_id: number | null;
}

export interface IOptions {
  birth  : boolean;
  death  : boolean;
  angel  : boolean;
  tonsure: boolean;
  deacon : boolean;
  priest : boolean;
  bishop : boolean;
}
