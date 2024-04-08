import conf from '../conf/conf';
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try{
          return await this.databases.createDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug,
            {
                title,
                content,
                featuredImage,
                status,
                userId,
            }
          )
        }catch(error){
            console.log("Appwrite service :: createpost :: error", error)
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try{
           return await this.databases.updateDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug,
            {
                title,
                content,
                featuredImage,
                status,
            }
           )
        }catch(error){
            console.log("Appwrite service :: updatepost :: error", error)
        }
    }  

    async deletePost(slug){
        try{
            return await this.databases.deleteDocument(
              conf.appwriteDatabaseId,
              conf.appwriteCollectionId,
              slug
            )
        }catch(error){
            console.log("Appwrite service :: deltepost :: error", error)
            return false
        }
    }

    async getPost(slug){
        try{
            return await this.databases.getDocument(
                 conf.appwriteDatabaseId,
                 conf.appwriteCollectionId,
                 slug
            )
        }catch(error){
            console.log("Appwrite service :: getpost :: error", error)
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
       try{
           return await this.databases.listDocuments(
                 conf.appwriteDatabaseId,
                 conf.appwriteCollectionId,
                 queries,
                  
           )
       }catch(error){
            console.log("Appwrite service :: getpost :: error", error);
            return false
        }
    }

    async uploadFile(file){
        try{
           return await this.bucket.createFile(
            conf.appwriteBucketId,
            ID.unique(),
            file
           )
        }catch(error){
            console.log("Appwrite service :: uploadfile :: error", error);
            return false
        }
    }

    async deleteFile(fileId){
        try{
           await this.bucket.deleteFile(
            conf.appwriteBucketId,
            fileId
           )
           return true
        }catch(error){
            console.log("Appwrite service :: deletefile :: error", error);
            return false
        }
    }

    getFilePriew(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}

const service = new Service()
export default service