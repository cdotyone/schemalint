module.exports = {
  connection: {
    engine: 'mysql',
    host: '127.0.0.1',
    user: 'root',
    password: 'password',
    database: 'db',
    charset: 'utf8'
  },

  plugins: ['./example2/custom-rules'],

  rules: {
    'name-casing': ['error', 'camel'],
    'prefer-jsonb-to-json': ['error'],
    'prefer-text-to-varchar': ['error'],
    'prefer-timestamptz-to-timestamp': ['error'],
    'prefer-identity-to-serial': ['error'],
    'name-inflection': ['error', 'singular'],
    'required-field': ['error', 'created:TIMESTAMP default CURRENT_TIMESTAMP', 'modified:TIMESTAMP default CURRENT_TIMESTAMP null on update CURRENT_TIMESTAMP'],
    'last-field': ['error', 'modified:TIMESTAMP default CURRENT_TIMESTAMP null on update CURRENT_TIMESTAMP'],
    'rename-field': ['error', 'moduleCode:appCode varchar(50) null'],
    'field-type': ['error',
      "isActive:char(1):char(1) default ('Y') not null",
      "isArchived:char(1):char(1) default ('N') not null",
      "typeCode:varchar(20):varchar(20) not null",
      "parentCode:varchar(20):varchar(20) null",
      "linkTypeCode:varchar(20):varchar(20) not null",
      "fieldTypeCode:varchar(20):varchar(20) not null",
      "iconCode:varchar(50):varchar(50) null",
      "stateCode:varchar(4):varchar(4) not null",
      "countryCode:varchar(4):varchar(4) not null",
      "photoTypeCode:varchar(20):varchar(20) not null",
      "phoneTypeCode:varchar(20):varchar(20) not null",
      "personTypeCode:varchar(20):varchar(20) not null",
      "loginProviderCode:varchar(50):varchar(50) null",
      'personUID:varchar(36):varchar(36) default (uuid()) not null',
      'userUID:varchar(36):varchar(36) default (uuid()) not null',
      'uid:varchar(36):varchar(36) default (uuid()) null',
      'ouid:varchar(36):varchar(36) default (uuid()) null',
      'modified:TIMESTAMP:TIMESTAMP default CURRENT_TIMESTAMP null on update CURRENT_TIMESTAMP',
      'created:TIMESTAMP:TIMESTAMP default CURRENT_TIMESTAMP',
      'oid:int:int'
    ],
  },

  schemas: [
    {
      name: 'db',
    },
  ],

  ignores: [
    { identifier: 'db.orgUnit.OUCode', rule: 'name-casing' },
  ],
};
