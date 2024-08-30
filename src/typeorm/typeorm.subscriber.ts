import { EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent, RemoveEvent, SoftRemoveEvent, RecoverEvent, TransactionStartEvent, TransactionCommitEvent, TransactionRollbackEvent } from 'typeorm';
import { Logger } from '@nestjs/common';

@EventSubscriber()
export class PostSubscriber implements EntitySubscriberInterface {
  private readonly logger = new Logger('TypeORM');

  afterLoad(entity: any) {
    this.logger.log(`AFTER ENTITY LOADED: `, entity);
  }

  beforeInsert(event: InsertEvent<any>) {
    this.logger.log(`BEFORE ENTITY INSERTED: `, event.entity);
  }

  afterInsert(event: InsertEvent<any>) {
    this.logger.log(`AFTER ENTITY INSERTED: `, event.entity);
  }

  beforeUpdate(event: UpdateEvent<any>) {
    this.logger.log(`BEFORE ENTITY UPDATED: `, event.entity);
  }

  afterUpdate(event: UpdateEvent<any>) {
    this.logger.log(`AFTER ENTITY UPDATED: `, event.entity);
  }

  beforeRemove(event: RemoveEvent<any>) {
    this.logger.log(`BEFORE ENTITY WITH ID ${event.entityId} REMOVED: `, event.entity);
  }

  afterRemove(event: RemoveEvent<any>) {
    this.logger.log(`AFTER ENTITY WITH ID ${event.entityId} REMOVED: `, event.entity);
  }

  beforeSoftRemove(event: SoftRemoveEvent<any>) {
    this.logger.log(`BEFORE ENTITY WITH ID ${event.entityId} SOFT REMOVED: `, event.entity);
  }

  afterSoftRemove(event: SoftRemoveEvent<any>) {
    this.logger.log(`AFTER ENTITY WITH ID ${event.entityId} SOFT REMOVED: `, event.entity);
  }

  beforeRecover(event: RecoverEvent<any>) {
    this.logger.log(`BEFORE ENTITY WITH ID ${event.entityId} RECOVERED: `, event.entity);
  }

  afterRecover(event: RecoverEvent<any>) {
    this.logger.log(`AFTER ENTITY WITH ID ${event.entityId} RECOVERED: `, event.entity);
  }

  beforeTransactionStart(event: TransactionStartEvent) {
    this.logger.log(`BEFORE TRANSACTION STARTED: `, event);
  }

  afterTransactionStart(event: TransactionStartEvent) {
    this.logger.log(`AFTER TRANSACTION STARTED: `, event);
  }

  beforeTransactionCommit(event: TransactionCommitEvent) {
    this.logger.log(`BEFORE TRANSACTION COMMITTED: `, event);
  }

  afterTransactionCommit(event: TransactionCommitEvent) {
    this.logger.log(`AFTER TRANSACTION COMMITTED: `, event);
  }

  beforeTransactionRollback(event: TransactionRollbackEvent) {
    this.logger.log(`BEFORE TRANSACTION ROLLBACK: `, event);
  }

  afterTransactionRollback(event: TransactionRollbackEvent) {
    this.logger.log(`AFTER TRANSACTION ROLLBACK: `, event);
  }
}
