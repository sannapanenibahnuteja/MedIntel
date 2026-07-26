from typing import Generic, TypeVar

from sqlalchemy.orm import Session

ModelType = TypeVar("ModelType")


class BaseRepository(Generic[ModelType]):
    def __init__(
        self,
        db: Session,
        model,
    ):
        self.db = db
        self.model = model

    def create(self, obj):
        self.db.add(obj)
        self.db.commit()
        self.db.refresh(obj)
        return obj

    def get_by_id(self, obj_id: int):
        return (
            self.db.query(self.model)
            .filter(self.model.id == obj_id)
            .first()
        )

    def get_all(
        self,
        skip: int = 0,
        limit: int = 10,
    ):
        return (
            self.db.query(self.model)
            .offset(skip)
            .limit(limit)
            .all()
        )

    def delete(self, obj):
        self.db.delete(obj)
        self.db.commit()

    def update(self):
        self.db.commit()