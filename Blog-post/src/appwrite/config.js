import conf from "../conf/conf";

import { Client, Databases,ID,Storage,Query } from "appwrite";

export class Service{
       client = new Client();
       databases;
       bucket;

       constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);

        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
       }

       async createPost({title,slug,content,featuredImage,status,userId}){
           // eslint-disable-next-line no-useless-catch
           try {
              return await this.databases.createDocument(
                   conf.appwriteUrl,
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
           } catch (error) {
               throw error
           }

       }



       async updatePost(slug,{title,content,featuredImage,status}){
               // eslint-disable-next-line no-useless-catch
               try {
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
               } catch (error) {
                  throw error
               }
       }


       async deletePost(slug){
             // eslint-disable-next-line no-useless-catch
             try {
                await this.databases.deleteDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId,
                    slug
                )
                return true
             } catch (error) {
                console.log(error)
                return false
             }
       }

       async getPost(slug){
            try {
                return await this.databases.getDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId,
                    slug,
                )
            } catch (error) {
                console.log(error)
            }
       }
      

       async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
                

            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }

    //file upload service

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }



}


const service = new Service()
export default service
