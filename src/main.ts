import { S3Client } from '@aws-sdk/client-s3';
import { S3SyncClient } from 's3-sync-client';
import path from 'path';
import * as core from '@actions/core';

async function s3FileSync() {
  try {
    const bucketName = core.getInput('bucket_name');
    const sourceDirectory = core.getInput('source_directory');
    const region = core.getInput('aws_region');
    const accessKeyId = core.getInput('aws_access_key_id');
    const secretAccessKey = core.getInput('aws_secret_access_key');

    const s3Client = new S3Client({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey
      }
    });

    const { sync } = new S3SyncClient({ client: s3Client });

    const distDir = path.resolve(sourceDirectory);

    const syncAllFiles = async () => {
      await sync(distDir, `s3://${bucketName}`, {
        del: true,
        filters: [{ exclude: (key: string) => key.endsWith('.DS_Store') }]
      });
    };

    const syncJSFiles = async () => {
      await sync(distDir, `s3://${bucketName}`, {
        del: true,
        filters: [
          { exclude: () => true },
          { include: (key: string) => key.endsWith('.js') }
        ],
        commandInput: {
          ContentType: 'application/javascript'
        }
      });
    };

    await syncAllFiles();
    await syncJSFiles();

    core.info('Sync completed successfully.');
  } catch (error) {
    core.setFailed(`Action failed with error: ${error}`);
  }
}

export async function run() {
  try {
    await s3FileSync();
    core.info('Complete');
  } catch (error) {
    core.error(error instanceof Error ? error : 'Unexpected error occurred');
  } finally {
    process.exit();
  }
}