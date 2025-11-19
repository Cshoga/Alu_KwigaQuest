from models import Progress, db

BADGE_RULES = [
    {'id': 'badge_quiz_master', 'label': 'Quiz Master', 'min_avg': 90},
    {'id': 'badge_persistent_learner', 'label': 'Persistent Learner', 'lessons_completed': 3},
]


class BadgeService:
    @staticmethod
    def evaluate_and_award(user_id):
        p = Progress.query.filter_by(user_id=user_id).first()
        if not p:
            return []

        current = set(p.badges.split(',')) if p.badges else set()
        scores = [int(x.split(':')[1]) for x in p.quiz_scores.split(',') if x]
        avg = sum(scores) / len(scores) if scores else 0
        lessons = [x for x in p.lessons_completed.split(',') if x]

        for rule in BADGE_RULES:
            if rule.get('min_avg') and avg >= rule['min_avg']:
                current.add(rule['id'])
            if rule.get('lessons_completed') and len(lessons) >= rule['lessons_completed']:
                current.add(rule['id'])

        p.badges = ','.join(current)
        db.session.commit()

        return list(current)
