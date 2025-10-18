# Guide de Configuration et de Workflow Git

## Initialisation du Projet

Commencez par initialiser votre dépôt local et le pousser vers GitHub :

```bash
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/YSO-DEV/EvalaluationGithub-Yann-Leo.git
git push -u origin main
```

---

## Création et Envoi des Branches

Créez vos branches de travail et poussez-les vers le dépôt distant :

```bash
git switch -c dev
git push -u origin dev

git switch -b Ajout
git push -u origin Ajout

git switch -b Bascule
git push -u origin Bascule

git switch -b Compteur
git push -u origin Compteur
```

---

## Configuration des Règles de Protection de Branche (sur GitHub)

1. Allez dans votre **dépôt GitHub** → **Settings** → **Branches**.  
2. Sous **Branch protection rules**, cliquez sur **"Add rule"**.  
3. Dans **Branch name pattern**, entrez :
   ```
   main
   ```

## Changer et Pousser sur une Branche

Pour changer de branche :

```bash
git switch [nom-de-la-branche]
```

Pour pousser vos modifications vers le dépôt distant :

```bash
git push origin [nom-de-la-branche]
```

---

## Workflow de Fusion

Lorsque votre fonctionnalité ou correctif est prêt :

1. Basculez sur la branche `dev` :
   ```bash
   git switch dev
   ```
2. Fusionnez votre branche de travail dans `dev` :
   ```bash
   git merge [nom-de-la-branche]
   ```
3. Corrigez les éventuels conflits, puis poussez la branche `dev` mise à jour :
   ```bash
   git push origin dev
   ```

---

## Stratégie de Fusion

- Effectuez les premières fusions dans la branche `dev` pour tester et intégrer les modifications.  
- Une fois que tout est stable et validé, fusionnez `dev` dans `main` pour finaliser la version.  

Cette méthode garantit un processus de développement propre, organisé et évite de casser la branche principale.

