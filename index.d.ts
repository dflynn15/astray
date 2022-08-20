import * as AST from "estree";
import { AST_NODE_TYPES } from "@typescript-eslint/types";
import * as ts from "typescript";

type Handler<M, N, S> = (
	node: Path<M, N>,
	state: S
) => M[keyof M] | boolean | void;
type Block<M, N, S> = {
	enter?: Handler<M, N, S>;
	exit?: Handler<M, N, S>;
};

export interface Context<M = ESTreeMap> {
	parent: M[keyof M] | void;
	scanned?: boolean;
	bindings?: Record<string, M[keyof M]>;
	locals?: Record<string, M[keyof M]>;
}

export type Path<M, T> = T & {
	path?: Context<M>;
};

export type Visitor<S, M = ESTreeMap> = {
	[K in keyof M]?: Handler<M, M[K], S> | Block<M, M[K], S>;
};

export const SKIP: boolean;
export const REMOVE: boolean;

export function walk<T, S = void, M = ESTreeMap>(
	node: T,
	visitor: Visitor<S, M>,
	state?: S,
	parent?: M[keyof M]
): Path<M, T>;
export function lookup<M = ESTreeMap, T = M[keyof M]>(
	node: Path<M, T>,
	target?: string
): Record<string, Path<M, M[keyof M]>>;

export interface ESTreeMap {
	ArrayExpression: AST.ArrayExpression;
	ArrayPattern: AST.ArrayPattern;
	ArrowFunctionExpression: AST.ArrowFunctionExpression;
	AssignmentExpression: AST.AssignmentExpression;
	AssignmentPattern: AST.AssignmentPattern;
	AssignmentProperty: AST.AssignmentProperty;
	AwaitExpression: AST.AwaitExpression;
	BinaryExpression: AST.BinaryExpression;
	BlockStatement: AST.BlockStatement;
	BreakStatement: AST.BreakStatement;
	CallExpression: AST.CallExpression;
	CatchClause: AST.CatchClause;
	ChainElement: AST.ChainElement;
	ChainExpression: AST.ChainExpression;
	Class: AST.Class;
	ClassBody: AST.ClassBody;
	ClassDeclaration: AST.ClassDeclaration;
	ClassExpression: AST.ClassExpression;
	Comment: AST.Comment;
	ConditionalExpression: AST.ConditionalExpression;
	ContinueStatement: AST.ContinueStatement;
	DebuggerStatement: AST.DebuggerStatement;
	Declaration: AST.Declaration;
	Directive: AST.Directive;
	DoWhileStatement: AST.DoWhileStatement;
	EmptyStatement: AST.EmptyStatement;
	ExportAllDeclaration: AST.ExportAllDeclaration;
	ExportDefaultDeclaration: AST.ExportDefaultDeclaration;
	ExportNamedDeclaration: AST.ExportNamedDeclaration;
	ExportSpecifier: AST.ExportSpecifier;
	Expression: AST.Expression;
	ExpressionStatement: AST.ExpressionStatement;
	ForInStatement: AST.ForInStatement;
	ForOfStatement: AST.ForOfStatement;
	ForStatement: AST.ForStatement;
	Function: AST.Function;
	FunctionDeclaration: AST.FunctionDeclaration;
	FunctionExpression: AST.FunctionExpression;
	Identifier: AST.Identifier;
	IfStatement: AST.IfStatement;
	ImportDeclaration: AST.ImportDeclaration;
	ImportDefaultSpecifier: AST.ImportDefaultSpecifier;
	ImportExpression: AST.ImportExpression;
	ImportNamespaceSpecifier: AST.ImportNamespaceSpecifier;
	ImportSpecifier: AST.ImportSpecifier;
	LabeledStatement: AST.LabeledStatement;
	Literal: AST.Literal;
	LogicalExpression: AST.LogicalExpression;
	MemberExpression: AST.MemberExpression;
	MetaProperty: AST.MetaProperty;
	MethodDefinition: AST.MethodDefinition;
	ModuleDeclaration: AST.ModuleDeclaration;
	ModuleSpecifier: AST.ModuleSpecifier;
	NewExpression: AST.NewExpression;
	Node: AST.Node;
	ObjectExpression: AST.ObjectExpression;
	ObjectPattern: AST.ObjectPattern;
	Pattern: AST.Pattern;
	Program: AST.Program;
	Property: AST.Property;
	RegExpLiteral: AST.RegExpLiteral;
	RestElement: AST.RestElement;
	ReturnStatement: AST.ReturnStatement;
	SequenceExpression: AST.SequenceExpression;
	SimpleCallExpression: AST.SimpleCallExpression;
	SimpleLiteral: AST.SimpleLiteral;
	SpreadElement: AST.SpreadElement;
	Statement: AST.Statement;
	Super: AST.Super;
	SwitchCase: AST.SwitchCase;
	SwitchStatement: AST.SwitchStatement;
	TaggedTemplateExpression: AST.TaggedTemplateExpression;
	TemplateElement: AST.TemplateElement;
	TemplateLiteral: AST.TemplateLiteral;
	ThisExpression: AST.ThisExpression;
	ThrowStatement: AST.ThrowStatement;
	TryStatement: AST.TryStatement;
	UnaryExpression: AST.UnaryExpression;
	UpdateExpression: AST.UpdateExpression;
	VariableDeclaration: AST.VariableDeclaration;
	VariableDeclarator: AST.VariableDeclarator;
	WhileStatement: AST.WhileStatement;
	WithStatement: AST.WithStatement;
	YieldExpression: AST.YieldExpression;

	// Adding JSX
	[AST_NODE_TYPES.JSXAttribute]: ts.JsxAttribute;
	[AST_NODE_TYPES.JSXClosingElement]: ts.JsxClosingElement;
	[AST_NODE_TYPES.JSXClosingFragment]: ts.JsxClosingFragment;
	[AST_NODE_TYPES.JSXElement]: ts.JsxElement | ts.JsxSelfClosingElement;
	[AST_NODE_TYPES.JSXEmptyExpression]: ts.JsxExpression;
	[AST_NODE_TYPES.JSXExpressionContainer]: ts.JsxExpression;
	[AST_NODE_TYPES.JSXFragment]: ts.JsxFragment;
	[AST_NODE_TYPES.JSXIdentifier]: ts.Identifier | ts.ThisExpression;
	[AST_NODE_TYPES.JSXOpeningElement]:
		| ts.JsxOpeningElement
		| ts.JsxSelfClosingElement;
	[AST_NODE_TYPES.JSXOpeningFragment]: ts.JsxOpeningFragment;
	[AST_NODE_TYPES.JSXSpreadAttribute]: ts.JsxSpreadAttribute;
	[AST_NODE_TYPES.JSXSpreadChild]: ts.JsxExpression;
	[AST_NODE_TYPES.JSXMemberExpression]: ts.PropertyAccessExpression;
	[AST_NODE_TYPES.JSXNamespacedName]: ts.Identifier | ts.ThisExpression;
	[AST_NODE_TYPES.JSXText]: ts.JsxText;
}
