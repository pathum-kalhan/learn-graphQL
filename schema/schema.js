const graphql = require('graphql');
const Author = require('../models/Author')
const Book = require('../models/Book')

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLInt, GraphQLList } = graphql;

const books = [
    { name: 'Adishtanaya', genre: 'History', id: '1', authorId: '1' },
    { name: 'Deshapremaya ennath karanu pinisa', genre: 'History', id: '2', authorId: '2' },
    { name: 'Gamperaliya', genre: 'Noval', id: '3', authorId: '3' }
]

const authors = [
    { name: 'Wasantha karannagoda', age: 70, id: '1' },
    { name: 'Pathum cornal', age: 45, id: '2' },
    { name: 'Martin wikramasinghe', age: 80, id: '3' }

]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        authorId: {
            type: AuthorType,
            resolve(parent, args) {
                // db
                return Author.findById(args.id)
            }

        }
    }),

})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                // return books.filter(e => e.id === parent.id)
                return Book.findById(parent.id)
            }
        }


    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLString } },

            resolve(parent, args) {
                // db
                return Book.findById(args.id)
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLString } },
            resolve(parent, args) {
                // db
                return Author.findById(args.id)
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return Book.find()
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: GraphQLString },
                age: { type: GraphQLInt },
            },
            resolve(parent, args) {
                try {
                    const { name, age } = args;


                    const data = new Author({
                        name,
                        age
                    })
                    data.save()


                } catch (error) {
                    console.log(error)
                }
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: GraphQLString },
                genre: { type: GraphQLString },
                authorId: { type: GraphQLString },

            },
            resolve(parent, args) {
                try {
                    const { name, genre, authorId } = args;


                    const data = new Book({
                        name, genre, authorId
                    })
                    data.save()


                } catch (error) {
                    console.log(error)
                }
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})
