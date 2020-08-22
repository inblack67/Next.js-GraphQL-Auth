/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */







declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
}

export interface NexusGenRootTypes {
  Mutation: {};
  Query: {};
  Story: { // root type
    _id: string; // ID!
    createdAt: string; // String!
    description: string; // String!
    title: string; // String!
    user: string; // String!
  }
  User: { // root type
    _id: string; // ID!
    createdAt: string; // String!
    email: string; // String!
    name: string; // String!
    password?: string | null; // String
  }
}

export interface NexusGenAllTypes extends NexusGenRootTypes {
  String: NexusGenScalars['String'];
  Int: NexusGenScalars['Int'];
  Float: NexusGenScalars['Float'];
  Boolean: NexusGenScalars['Boolean'];
  ID: NexusGenScalars['ID'];
}

export interface NexusGenFieldTypes {
  Mutation: { // field return type
    login: NexusGenRootTypes['User']; // User!
    register: NexusGenRootTypes['User']; // User!
  }
  Query: { // field return type
    getMe: NexusGenRootTypes['User']; // User!
    stories: NexusGenRootTypes['Story'][]; // [Story!]!
    story: NexusGenRootTypes['Story']; // Story!
    users: NexusGenRootTypes['User'][]; // [User!]!
  }
  Story: { // field return type
    _id: string; // ID!
    createdAt: string; // String!
    description: string; // String!
    title: string; // String!
    user: string; // String!
  }
  User: { // field return type
    _id: string; // ID!
    createdAt: string; // String!
    email: string; // String!
    name: string; // String!
    password: string | null; // String
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    login: { // args
      email?: string | null; // String
      password?: string | null; // String
    }
    register: { // args
      email?: string | null; // String
      name?: string | null; // String
      password?: string | null; // String
    }
  }
  Query: {
    story: { // args
      id?: string | null; // ID
    }
  }
}

export interface NexusGenAbstractResolveReturnTypes {
}

export interface NexusGenInheritedFields {}

export type NexusGenObjectNames = "Mutation" | "Query" | "Story" | "User";

export type NexusGenInputNames = never;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = "Boolean" | "Float" | "ID" | "Int" | "String";

export type NexusGenUnionNames = never;

export interface NexusGenTypes {
  context: any;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  allTypes: NexusGenAllTypes;
  inheritedFields: NexusGenInheritedFields;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractResolveReturn: NexusGenAbstractResolveReturnTypes;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
}