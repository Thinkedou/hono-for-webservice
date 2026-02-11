import { createClient, type RedisClientType } from 'redis'

let redisClient: RedisClientType | null = null

const initializeRedisClient = async () => {
    redisClient = createClient({
        socket:{
          port:6379,
          host:'redis-cache'
        }
      })
    try {
        // connect to the Redis server
        await redisClient.connect();
        console.log(`🚨⚡ Connected to Redis successfully!`);
    } catch (e) {
        console.error(`Connection to Redis failed with error:`);
        console.error(e);
    }
};

const get = async (redisKey:string)=>{
    if(!redisClient){
        throw new Error('Redis client is not initialized. Please call initializeRedisClient() first.');
    }
    return redisClient.get(redisKey)
}
const set = async (redisKey:string, value:string)=>{
    if(!redisClient){
        throw new Error('Redis client is not initialized. Please call initializeRedisClient() first.');
    }
    return await redisClient.set(redisKey, value);
}
const del = async (redisKey:string)=>{
    if(!redisClient){
        throw new Error('Redis client is not initialized. Please call initializeRedisClient() first.');
    }
    return await redisClient.del(redisKey);
}



export {
    initializeRedisClient,
    redisClient,
    get as getCache,
    set as setCache,
    del as delCache
}