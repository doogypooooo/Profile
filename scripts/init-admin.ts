import { db } from "../server/db";
import { users } from "../shared/schema";
import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function createAdmin() {
  try {
    let username = "admin";
    let password = "admin123"; // 실제 환경에서는 강력한 비밀번호 사용 권장
    let hashedPassword;
    let newUser;


    const existingUsers = await db.select().from(users);
  
    if (existingUsers.length === 0) {
        hashedPassword = await hashPassword(password);
        [newUser] = await db.insert(users).values({
            username,
            password: hashedPassword,
            isAdmin: 1,
        }).returning();

        console.log("관리자 계정이 성공적으로 생성되었습니다:");
        console.log(`Username: ${username}`);
        console.log(`Password: ${password}`);

    } else {
        console.log("이미 사용자가 존재합니다. 새로운 관리자 계정 추가합니다.");
        username = "newAdmin";
        password = "newAdmin123";
        hashedPassword = await hashPassword(password);
        [newUser] = await db.insert(users).values({username, password: hashedPassword, isAdmin : 1}).returning();
        console.log("새로운 관리자 계정이 성공적으로 생성되었습니다:");
    }
   
    
    
  
    
  
  
    console.log(`Admin ID: ${newUser.id}`);
  } catch (error) {
    console.error("관리자 계정 생성 중 오류가 발생했습니다:", error);
  } finally {
    process.exit(0);
  }
}

// 스크립트 실행
createAdmin();