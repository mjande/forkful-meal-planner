/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IngredientsImport } from './routes/ingredients'
import { Route as HelpImport } from './routes/help'
import { Route as IndexImport } from './routes/index'
import { Route as RecipesIndexImport } from './routes/recipes/index'

// Create/Update Routes

const IngredientsRoute = IngredientsImport.update({
  id: '/ingredients',
  path: '/ingredients',
  getParentRoute: () => rootRoute,
} as any)

const HelpRoute = HelpImport.update({
  id: '/help',
  path: '/help',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const RecipesIndexRoute = RecipesIndexImport.update({
  id: '/recipes/',
  path: '/recipes/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/help': {
      id: '/help'
      path: '/help'
      fullPath: '/help'
      preLoaderRoute: typeof HelpImport
      parentRoute: typeof rootRoute
    }
    '/ingredients': {
      id: '/ingredients'
      path: '/ingredients'
      fullPath: '/ingredients'
      preLoaderRoute: typeof IngredientsImport
      parentRoute: typeof rootRoute
    }
    '/recipes/': {
      id: '/recipes/'
      path: '/recipes'
      fullPath: '/recipes'
      preLoaderRoute: typeof RecipesIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/help': typeof HelpRoute
  '/ingredients': typeof IngredientsRoute
  '/recipes': typeof RecipesIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/help': typeof HelpRoute
  '/ingredients': typeof IngredientsRoute
  '/recipes': typeof RecipesIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/help': typeof HelpRoute
  '/ingredients': typeof IngredientsRoute
  '/recipes/': typeof RecipesIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/help' | '/ingredients' | '/recipes'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/help' | '/ingredients' | '/recipes'
  id: '__root__' | '/' | '/help' | '/ingredients' | '/recipes/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  HelpRoute: typeof HelpRoute
  IngredientsRoute: typeof IngredientsRoute
  RecipesIndexRoute: typeof RecipesIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  HelpRoute: HelpRoute,
  IngredientsRoute: IngredientsRoute,
  RecipesIndexRoute: RecipesIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/help",
        "/ingredients",
        "/recipes/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/help": {
      "filePath": "help.tsx"
    },
    "/ingredients": {
      "filePath": "ingredients.tsx"
    },
    "/recipes/": {
      "filePath": "recipes/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
