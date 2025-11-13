# Requisitos Funcionais

1. (X) Deve ser possível criar um usuário com: nome, email, senha e id (UUID).  
   Deve haver validação de email único.

2. (X) Deve ser possível identificar o usuário entre as requisições.

3. Deve ser possível registrar uma refeição vinculada a um usuário.

4. Deve ser possível editar qualquer campo de uma refeição (nome, descrição, data e hora, `isOnDiet`) desde que o usuário seja o criador.

5. Deve ser possível apagar uma refeição. Apenas o usuário criador pode apagar sua refeição.

6. Deve ser possível listar todas as refeições pertencentes ao usuário autenticado, com paginação opcional.

7. Deve ser possível visualizar os detalhes de uma única refeição pelo id, apenas se for do usuário autenticado.

8. Deve ser possível recuperar, para o usuário autenticado:

   - Quantidade total de refeições registradas.
   - Quantidade total de refeições dentro da dieta.
   - Quantidade total de refeições fora da dieta.
   - Melhor sequência (maior streak) de refeições consecutivas dentro da dieta.

9. O usuário só pode visualizar, editar e apagar refeições que ele mesmo criou.
