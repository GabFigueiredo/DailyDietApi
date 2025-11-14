# Requisitos Funcionais

1. (X) Deve ser possível criar um usuário com: nome, email, senha e id (UUID).  
   Deve haver validação de email único.

2. (X) Deve ser possível identificar o usuário entre as requisições.

3. (X) Deve ser possível registrar uma refeição vinculada a um usuário.

4. (X) Deve ser possível editar qualquer campo de uma refeição desde que o usuário seja o criador.

5. (X) Deve ser possível apagar uma refeição. Apenas o usuário criador pode apagar sua refeição.

6. (X) Deve ser possível listar todas as refeições pertencentes ao usuário autenticado.

7. (X) Deve ser possível visualizar os detalhes de uma única refeição pelo id, apenas se for do usuário autenticado.

8. Deve ser possível recuperar, para o usuário autenticado:
   - (X) Quantidade total de refeições registradas.
   - (X) Quantidade total de refeições dentro da dieta.
   - (X) Quantidade total de refeições fora da dieta.
   - Melhor sequência (maior streak) de refeições consecutivas dentro da dieta.
